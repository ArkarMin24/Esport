from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count
from .models import Match, Team, Tournament
from rest_framework.permissions import IsAuthenticated
from .serializers import DashboardTeamSerializer, DashboardTournamentSerializer, MatchSerializer, TeamRegistrationSerializer, TeamSerializer, TournamentSerializer


class DashboardSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return


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


@method_decorator(csrf_exempt, name='dispatch')
class DashboardLoginView(APIView):
    authentication_classes = []

    def post(self, request):
        username = request.data.get('username', '').strip()
        password = request.data.get('password', '')
        user = authenticate(request, username=username, password=password)
        if user is None:
            return Response({'detail': 'Invalid username or password.'}, status=status.HTTP_400_BAD_REQUEST)
        login(request, user)
        return Response({'username': user.get_username(), 'is_staff': user.is_staff, 'is_superuser': user.is_superuser})


class AccountOverviewView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'username': request.user.get_username(), 'is_staff': request.user.is_staff})


@method_decorator(csrf_exempt, name='dispatch')
class DashboardLogoutView(APIView):
    authentication_classes = [DashboardSessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class DashboardOverviewView(APIView):
    authentication_classes = [DashboardSessionAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):
        tournament = Tournament.objects.annotate(team_count=Count('teams')).first()
        matches = Match.objects.select_related('team_one', 'team_two').all()[:8]
        return Response({
            'user': request.user.get_username(),
            'tournament': TournamentSerializer(tournament).data if tournament else None,
            'teams': Team.objects.filter(tournament=tournament).count() if tournament else 0,
            'matches': MatchSerializer(matches, many=True).data,
            'live_matches': Match.objects.filter(status=Match.Status.LIVE).count(),
        })


@method_decorator(csrf_exempt, name='dispatch')
class DashboardMatchUpdateView(APIView):
    authentication_classes = [DashboardSessionAuthentication]
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        try:
            match = Match.objects.get(pk=pk)
        except Match.DoesNotExist:
            return Response({'detail': 'Match not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = MatchSerializer(match, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


@method_decorator(csrf_exempt, name='dispatch')
class DashboardTournamentListView(APIView):
    authentication_classes = [DashboardSessionAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):
        tournaments = Tournament.objects.annotate(team_count=Count('teams'))
        return Response(DashboardTournamentSerializer(tournaments, many=True).data)

    @method_decorator(csrf_exempt)
    def post(self, request):
        serializer = DashboardTournamentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(DashboardTournamentSerializer(serializer.save()).data, status=status.HTTP_201_CREATED)


@method_decorator(csrf_exempt, name='dispatch')
class DashboardTournamentDetailView(APIView):
    authentication_classes = [DashboardSessionAuthentication]
    permission_classes = [IsAdminUser]

    def get_object(self, pk):
        return Tournament.objects.annotate(team_count=Count('teams')).get(pk=pk)

    @method_decorator(csrf_exempt)
    def patch(self, request, pk):
        tournament = self.get_object(pk)
        serializer = DashboardTournamentSerializer(tournament, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        return Response(DashboardTournamentSerializer(serializer.save()).data)

    @method_decorator(csrf_exempt)
    def delete(self, request, pk):
        self.get_object(pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@method_decorator(csrf_exempt, name='dispatch')
class DashboardTeamListView(APIView):
    authentication_classes = [DashboardSessionAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):
        teams = Team.objects.select_related('tournament').prefetch_related('players')
        return Response(DashboardTeamSerializer(teams, many=True).data)

    @method_decorator(csrf_exempt)
    def post(self, request):
        serializer = DashboardTeamSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(DashboardTeamSerializer(serializer.save()).data, status=status.HTTP_201_CREATED)


@method_decorator(csrf_exempt, name='dispatch')
class DashboardTeamDetailView(APIView):
    authentication_classes = [DashboardSessionAuthentication]
    permission_classes = [IsAdminUser]

    @method_decorator(csrf_exempt)
    def patch(self, request, pk):
        team = Team.objects.get(pk=pk)
        serializer = DashboardTeamSerializer(team, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        return Response(DashboardTeamSerializer(serializer.save()).data)

    @method_decorator(csrf_exempt)
    def delete(self, request, pk):
        Team.objects.get(pk=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@method_decorator(csrf_exempt, name='dispatch')
class DashboardMatchListView(APIView):
    authentication_classes = [DashboardSessionAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):
        matches = Match.objects.select_related('tournament', 'team_one', 'team_two')
        return Response(MatchSerializer(matches, many=True).data)

    @method_decorator(csrf_exempt)
    def post(self, request):
        serializer = MatchSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(MatchSerializer(serializer.save()).data, status=status.HTTP_201_CREATED)


@method_decorator(csrf_exempt, name='dispatch')
class DashboardMatchDetailView(APIView):
    authentication_classes = [DashboardSessionAuthentication]
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        match = Match.objects.get(pk=pk)
        serializer = MatchSerializer(match, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)

    def delete(self, request, pk):
        Match.objects.get(pk=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
