import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('description', models.TextField(blank=True)),
                ('prize_pool', models.DecimalField(decimal_places=2, max_digits=12)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('registration_deadline', models.DateTimeField()),
                ('game_mode', models.CharField(default='5v5 Draft Pick', max_length=50)),
                ('max_teams', models.PositiveSmallIntegerField(default=32)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={'ordering': ['start_date', 'name']},
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('captain_name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('phone_number', models.CharField(max_length=30)),
                ('registered_at', models.DateTimeField(auto_now_add=True)),
                ('tournament', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teams', to='tournaments.tournament')),
            ],
            options={'ordering': ['name']},
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('in_game_name', models.CharField(max_length=100)),
                ('full_name', models.CharField(blank=True, max_length=100)),
                ('role', models.CharField(blank=True, max_length=30)),
                ('is_captain', models.BooleanField(default=False)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='players', to='tournaments.team')),
            ],
            options={'ordering': ['id']},
        ),
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stage', models.CharField(default='Quarter Final', max_length=50)),
                ('scheduled_at', models.DateTimeField()),
                ('best_of', models.PositiveSmallIntegerField(default=3)),
                ('status', models.CharField(choices=[('upcoming', 'Upcoming'), ('live', 'Live'), ('finished', 'Finished')], default='upcoming', max_length=10)),
                ('team_one_score', models.PositiveSmallIntegerField(default=0)),
                ('team_two_score', models.PositiveSmallIntegerField(default=0)),
                ('team_one', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='home_matches', to='tournaments.team')),
                ('team_two', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='away_matches', to='tournaments.team')),
                ('tournament', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='matches', to='tournaments.tournament')),
            ],
            options={'ordering': ['scheduled_at']},
        ),
        migrations.AddConstraint(
            model_name='team',
            constraint=models.UniqueConstraint(fields=('tournament', 'name'), name='unique_team_name_per_tournament'),
        ),
    ]
