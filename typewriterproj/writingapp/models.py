from django.db import models

# Create your models here.
class DailyWc(models.Model):
    project_name = models.CharField(max_length=200)
    todays_wc = models.IntegerField()
    date = models.DateField("today's date")

    # Possibly change this later
    def __str__(self) -> str:
        return f'You wrote {self.todays_wc} on {self.date} for {self.project_name}'