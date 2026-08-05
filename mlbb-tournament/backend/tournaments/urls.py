from django.urls import path
from .views import MatchListView, TeamListView, TeamRegistrationView, TournamentDetailView, TournamentListView

urlpatterns = [
    path('tournaments/', TournamentListView.as_view(), name='tournament-list'),
    path('tournaments/<int:pk>/', TournamentDetailView.as_view(), name='tournament-detail'),
    path('teams/', TeamListView.as_view(), name='team-list'),
    path('teams/register/', TeamRegistrationView.as_view(), name='team-register'),
    path('matches/', MatchListView.as_view(), name='match-list'),
]
