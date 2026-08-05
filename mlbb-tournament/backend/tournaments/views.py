from rest_framework import generics
from django.db.models import Count
from .models import Match, Team, Tournament
from .serializers import MatchSerializer, TeamRegistrationSerializer, TeamSerializer, TournamentSerializer


class TournamentListView(generics.ListAPIView):
    queryset = Tournament.objects.annotate(team_count=Count('teams'))
    serializer_class = TournamentSerializer


class TournamentDetailView(generics.RetrieveAPIView):
    queryset = Tournament.objects.annotate(team_count=Count('teams'))
    serializer_class = TournamentSerializer


class TeamListView(generics.ListAPIView):
    serializer_class = TeamSerializer

    def get_queryset(self):
        queryset = Team.objects.select_related('tournament').prefetch_related('players')
        tournament_id = self.request.query_params.get('tournament')
        return queryset.filter(tournament_id=tournament_id) if tournament_id else queryset


class TeamRegistrationView(generics.CreateAPIView):
    serializer_class = TeamRegistrationSerializer


class MatchListView(generics.ListAPIView):
    serializer_class = MatchSerializer

    def get_queryset(self):
        queryset = Match.objects.select_related('tournament', 'team_one', 'team_two')
        tournament_id = self.request.query_params.get('tournament')
        return queryset.filter(tournament_id=tournament_id) if tournament_id else queryset
