from rest_framework import serializers
from writingapp.models import DailyWc, Project


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


class DailyWcSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(required=False)

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

    # For the nested serializer to be writable, you'll need to create create() and/or update() methods
    # to explicitly specify how the child relationships should be saved.
    def update(self, instance, validated_data):
        instance.todays_wc = validated_data.get('todays_wc', instance.todays_wc)
        instance.save()
        return instance

    # def update(self, instance, validated_data):
    #     project_data = validated_data.pop('project')
    #     if project_data is None:
    #         project, created = Project.objects.get_or_create(name='Unassigned')
    #     else:
    #         project = Project.objects.update(**project_data)
    #     daily_wc = DailyWc.objects.update(project=project, **validated_data)
    #     return daily_wc
