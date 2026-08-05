from django.db import transaction
from django.utils import timezone
from rest_framework import serializers
from .models import Match, Player, Team, Tournament


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'in_game_name', 'full_name', 'role', 'is_captain']


class TeamSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'tournament', 'name', 'captain_name', 'email', 'phone_number', 'registered_at', 'players']
        read_only_fields = ['registered_at']


class TournamentSerializer(serializers.ModelSerializer):
    team_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Tournament
        fields = ['id', 'name', 'description', 'prize_pool', 'start_date', 'end_date', 'registration_deadline', 'game_mode', 'max_teams', 'team_count']


class MatchSerializer(serializers.ModelSerializer):
    team_one_name = serializers.CharField(source='team_one.name', read_only=True)
    team_two_name = serializers.CharField(source='team_two.name', read_only=True)

    class Meta:
        model = Match
        fields = ['id', 'tournament', 'stage', 'team_one', 'team_one_name', 'team_two', 'team_two_name', 'scheduled_at', 'best_of', 'status', 'team_one_score', 'team_two_score']


class TeamRegistrationSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, min_length=5, max_length=5)

    class Meta:
        model = Team
        fields = ['id', 'tournament', 'name', 'captain_name', 'email', 'phone_number', 'players']
        read_only_fields = ['id']

    def validate(self, attrs):
        tournament = attrs['tournament']
        if tournament.teams.count() >= tournament.max_teams:
            raise serializers.ValidationError({'tournament': 'This tournament has reached its team limit.'})
        if timezone.now() > tournament.registration_deadline:
            raise serializers.ValidationError({'tournament': 'Registration for this tournament has closed.'})

        player_names = [player['in_game_name'].strip().casefold() for player in attrs['players']]
        if len(player_names) != len(set(player_names)):
            raise serializers.ValidationError({'players': 'Each player must have a unique in-game name.'})
        if sum(player.get('is_captain', False) for player in attrs['players']) != 1:
            raise serializers.ValidationError({'players': 'Select exactly one player as captain.'})
        return attrs

    @transaction.atomic
    def create(self, validated_data):
        players = validated_data.pop('players')
        team = Team.objects.create(**validated_data)
        Player.objects.bulk_create([Player(team=team, **player) for player in players])
        return team
