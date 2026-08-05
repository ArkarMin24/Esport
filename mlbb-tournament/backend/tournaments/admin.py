from django.contrib import admin

from .models import Match, Player, Team, Tournament


class PlayerInline(admin.TabularInline):
    model = Player
    extra = 0
    fields = ('in_game_name', 'full_name', 'role', 'is_captain')
    ordering = ('id',)


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'end_date', 'game_mode', 'team_count', 'max_teams', 'registration_deadline')
    list_filter = ('game_mode', 'start_date')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'team_count')
    date_hierarchy = 'start_date'
    fieldsets = (
        ('Tournament information', {'fields': ('name', 'description', 'game_mode')}),
        ('Dates and capacity', {'fields': ('start_date', 'end_date', 'registration_deadline', 'max_teams')}),
        ('Prize and activity', {'fields': ('prize_pool', 'team_count', 'created_at')}),
    )

    @admin.display(description='Registered teams')
    def team_count(self, obj):
        return obj.teams.count()


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'tournament', 'captain_name', 'email', 'phone_number', 'roster_size', 'registered_at')
    list_filter = ('tournament', 'registered_at')
    search_fields = ('name', 'captain_name', 'email', 'players__in_game_name')
    autocomplete_fields = ('tournament',)
    readonly_fields = ('registered_at',)
    inlines = (PlayerInline,)
    fieldsets = (
        ('Team details', {'fields': ('tournament', 'name', 'captain_name')}),
        ('Contact details', {'fields': ('email', 'phone_number')}),
        ('Registration', {'fields': ('registered_at',)}),
    )

    @admin.display(description='Players')
    def roster_size(self, obj):
        return obj.players.count()


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('in_game_name', 'team', 'role', 'is_captain')
    list_filter = ('is_captain', 'role', 'team__tournament')
    search_fields = ('in_game_name', 'full_name', 'team__name')
    autocomplete_fields = ('team',)
    list_select_related = ('team', 'team__tournament')


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('matchup', 'tournament', 'stage', 'scheduled_at', 'best_of', 'status', 'score')
    list_filter = ('status', 'stage', 'tournament')
    search_fields = ('team_one__name', 'team_two__name', 'tournament__name')
    autocomplete_fields = ('tournament', 'team_one', 'team_two')
    list_select_related = ('tournament', 'team_one', 'team_two')
    date_hierarchy = 'scheduled_at'
    fieldsets = (
        ('Matchup', {'fields': ('tournament', 'stage', 'team_one', 'team_two')}),
        ('Schedule and format', {'fields': ('scheduled_at', 'best_of', 'status')}),
        ('Result', {'fields': ('team_one_score', 'team_two_score')}),
    )

    @admin.display(description='Match')
    def matchup(self, obj):
        return f'{obj.team_one or "TBD"} vs {obj.team_two or "TBD"}'

    @admin.display(description='Score')
    def score(self, obj):
        return f'{obj.team_one_score} – {obj.team_two_score}'
