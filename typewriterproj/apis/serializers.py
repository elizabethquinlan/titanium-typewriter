from rest_framework import serializers
from writingapp.models import DailyWc


class DailyWcSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyWc
        fields = (
            'user',
            'project_name',
            'todays_wc',
            'text_area',
            'date',
            'accessed_today',
            'id',
        )