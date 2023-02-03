from rest_framework import serializers
from writingapp.models import DailyWc, Project


class DailyWcSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyWc
        fields = (
            'project',
            'user',
            'daily_goal',
            'daily_goal_bool',
            'todays_wc',
            'text_area',
            'date',
            'accessed_today',
            'id',
        )


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            'name',
            'start_date',
            'end_date',
            'word_count_goal',
            'id',
        )


# class CombinedSerializer(serializers.ModelSerializer):
#     dailywc = DailyWcSerializer(many=True)
#     project = ProjectSerializer(many=True)
