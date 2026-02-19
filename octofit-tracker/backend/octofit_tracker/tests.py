from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Team, Activity, Workout, LeaderboardEntry

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(username='testuser', password='testpass')
        self.assertEqual(user.username, 'testuser')

class TeamModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='member', password='pass')
    def test_create_team(self):
        team = Team.objects.create(name='TeamA')
        team.members.add(self.user)
        self.assertEqual(team.name, 'TeamA')
        self.assertIn(self.user, team.members.all())

class ActivityModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='activityuser', password='pass')
    def test_create_activity(self):
        activity = Activity.objects.create(user=self.user, activity_type='run', duration=30, date='2024-01-01')
        self.assertEqual(activity.activity_type, 'run')

class WorkoutModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='workoutuser', password='pass')
    def test_create_workout(self):
        workout = Workout.objects.create(user=self.user, name='Pushups')
        self.assertEqual(workout.name, 'Pushups')

class LeaderboardEntryModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='leaderuser', password='pass')
        self.team = Team.objects.create(name='TeamB')
        self.team.members.add(self.user)
    def test_create_leaderboard_entry(self):
        entry = LeaderboardEntry.objects.create(user=self.user, team=self.team, score=100, rank=1)
        self.assertEqual(entry.score, 100)

class APIRootTest(TestCase):
    def setUp(self):
        self.client = APIClient()
    def test_api_root(self):
        response = self.client.get(reverse('api-root'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
