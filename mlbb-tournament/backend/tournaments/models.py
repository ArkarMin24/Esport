from django.db import models
from django.core.exceptions import ValidationError


class Tournament(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    prize_pool = models.DecimalField(max_digits=12, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    registration_deadline = models.DateTimeField()
    game_mode = models.CharField(max_length=50, default='5v5 Draft Pick')
    max_teams = models.PositiveSmallIntegerField(default=32)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['start_date', 'name']

    def __str__(self):
        return self.name


class Team(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='teams')
    name = models.CharField(max_length=100)
    captain_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=30)
    registered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['tournament', 'name'], name='unique_team_name_per_tournament')]
        ordering = ['name']

    def __str__(self):
        return self.name


class Player(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')
    in_game_name = models.CharField(max_length=100)
    full_name = models.CharField(max_length=100, blank=True)
    role = models.CharField(max_length=30, blank=True)
    is_captain = models.BooleanField(default=False)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.in_game_name


class Match(models.Model):
    class Status(models.TextChoices):
        UPCOMING = 'upcoming', 'Upcoming'
        LIVE = 'live', 'Live'
        FINISHED = 'finished', 'Finished'

    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='matches')
    stage = models.CharField(max_length=50, default='Quarter Final')
    team_one = models.ForeignKey(Team, on_delete=models.SET_NULL, related_name='home_matches', null=True, blank=True)
    team_two = models.ForeignKey(Team, on_delete=models.SET_NULL, related_name='away_matches', null=True, blank=True)
    scheduled_at = models.DateTimeField()
    best_of = models.PositiveSmallIntegerField(default=3)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.UPCOMING)
    team_one_score = models.PositiveSmallIntegerField(default=0)
    team_two_score = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['scheduled_at']

    def clean(self):
        if self.team_one and self.team_two and self.team_one == self.team_two:
            raise ValidationError('A team cannot play against itself.')
        for team in (self.team_one, self.team_two):
            if team and team.tournament_id != self.tournament_id:
                raise ValidationError('Both teams must belong to this tournament.')

    def __str__(self):
        return f'{self.team_one or "TBD"} vs {self.team_two or "TBD"}'
