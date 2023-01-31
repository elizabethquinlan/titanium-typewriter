from django.db import models
import datetime

# Create your models here.
class DailyWc(models.Model):
    project_name = models.CharField(max_length=200, blank=True, default='')
    todays_wc = models.IntegerField()
    # Save the text area each day so the user can access that page and see it.
    text_area = models.CharField(max_length=500000, blank=True, default='Text here.')
    date = models.DateField("today's date", default=datetime.date.today)
    accessed_today = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'You wrote {self.todays_wc} words on {self.date} for {self.project_name}.'