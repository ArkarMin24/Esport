from django.urls import path
from .views import (
    AccountOverviewView, DashboardLoginView, DashboardLogoutView, DashboardMatchDetailView, DashboardMatchListView, DashboardMatchUpdateView, DashboardOverviewView,
    DashboardTeamDetailView, DashboardTeamListView, DashboardTournamentDetailView, DashboardTournamentListView,
    MatchListView, TeamListView, TeamRegistrationView, TournamentDetailView, TournamentListView,
)

urlpatterns = [
    path('tournaments/', TournamentListView.as_view(), name='tournament-list'),
    path('tournaments/<int:pk>/', TournamentDetailView.as_view(), name='tournament-detail'),
    path('teams/', TeamListView.as_view(), name='team-list'),
    path('teams/register/', TeamRegistrationView.as_view(), name='team-register'),
    path('matches/', MatchListView.as_view(), name='match-list'),
    path('dashboard/login/', DashboardLoginView.as_view(), name='dashboard-login'),
    path('account/overview/', AccountOverviewView.as_view(), name='account-overview'),
    path('dashboard/logout/', DashboardLogoutView.as_view(), name='dashboard-logout'),
    path('dashboard/overview/', DashboardOverviewView.as_view(), name='dashboard-overview'),
    path('dashboard/matches/<int:pk>/', DashboardMatchUpdateView.as_view(), name='dashboard-match-update'),
    path('dashboard/tournaments/', DashboardTournamentListView.as_view(), name='dashboard-tournament-list'),
    path('dashboard/tournaments/<int:pk>/', DashboardTournamentDetailView.as_view(), name='dashboard-tournament-detail'),
    path('dashboard/teams/', DashboardTeamListView.as_view(), name='dashboard-team-list'),
    path('dashboard/teams/<int:pk>/', DashboardTeamDetailView.as_view(), name='dashboard-team-detail'),
    path('dashboard/manage-matches/', DashboardMatchListView.as_view(), name='dashboard-match-list'),
    path('dashboard/manage-matches/<int:pk>/', DashboardMatchDetailView.as_view(), name='dashboard-match-detail'),
]
