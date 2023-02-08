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
    # project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())
    project = ProjectSerializer(required=False)

    class Meta:
        model = DailyWc
        fields = '__all__'
        # (
            # 'project',
            # 'user',
            # 'daily_goal',
            # 'daily_goal_bool',
            # 'todays_wc',
            # 'text_area',
            # 'date',
            # 'accessed_today',
            # 'id',
        # )

    # For the nested serializer to be writable, you'll need to create create() and/or update() methods
    # to explicitly specify how the child relationships should be saved.
    def create(self, validated_data):
        project_data = validated_data.pop('project')
        project = Project.objects.create(**project_data)
        dailywc = DailyWc.objects.create(project=project, **validated_data)
        return dailywc
