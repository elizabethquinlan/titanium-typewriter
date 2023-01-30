from rest_framework import serializers
from writingapp.models import DailyWc


class DailyWcSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyWc
        fields = (
            'project_name',
            'todays_wc',
            'text_area',
            'date',
            'id',
        )