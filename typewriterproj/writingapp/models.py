from django.contrib.auth.models import User
from django.db import models
import datetime

# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=255, default="Unassigned")
    start_date = models.DateField("today's date", default=datetime.date.today)
    end_date = models.DateField("end date", default=datetime.date.today)
    word_count_goal = models.PositiveIntegerField(default=0)


    def __str__(self) -> str:
        return f'The Project {self.name} started on {self.start_date} and will end on {self.end_date} with a goal of {self.word_count_goal} and an id of {self.id}.'


# add a default value for the 'project' field in the DailyWC model that corresponds to the "Unassigned" project.
class DailyWc(models.Model):
    # would reference the 'id' field in the Project model.
    project = models.ForeignKey(Project, default=None, on_delete=models.CASCADE) # each DailyWc instance is associated with a single Project instance, and each Project instance can have multiple DailyWc instances associated with it.
    user = models.ForeignKey(User, on_delete=models.CASCADE) # A user can be associated with multiple daily wordcounts
    todays_wc = models.IntegerField(default=0)
    # Save the text area each day so the user can access that page and see it.
    text_area = models.CharField(max_length=500000, blank=True, default='Text here.')
    date = models.DateField("today's date", default=datetime.date.today)
    accessed_today = models.BooleanField(default=False)
    daily_goal = models.IntegerField(default=0)
    daily_goal_bool = models.BooleanField(default=False)
    
    
    def __str__(self) -> str:
        return f'{self.user} wrote {self.todays_wc} words on {self.date} for Project {self.project}.'