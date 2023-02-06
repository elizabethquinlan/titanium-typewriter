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
        project_data = validated_data.pop('project', {})
        project = instance.project

        if project_data:
            project_serializer = ProjectSerializer(instance.project, data=project_data)
            if project_serializer.is_valid():
                project = project_serializer.save()
        # Still need to figure out how to drag the project data into here.x
        instance.project = project
        # instance.project = validated_data.get('project', instance.project)
        instance.todays_wc = validated_data.get('todays_wc', instance.todays_wc)
        instance.user = validated_data.get('user', instance.user)
        instance.daily_goal = validated_data.get('daily_goal', instance.daily_goal)
        instance.date = validated_data.get('date', instance.date)
        instance.accessed_today = validated_data.get('accessed_today', instance.accessed_today)
        instance.id = validated_data.get('id', instance.id)
        # REQUIRES MORE WORK: ()
        # instance.project = validated_data.get('project', instance.project)
        instance.text_area = validated_data.get('text_area', instance.text_area)
        instance.save()
        return instance

    def create(self, validated_data):
        # have a project object on it. Get project off using id
        project_data = validated_data.pop('project', None)
        # print(validated_data)
        if project_data is None:
            project, created = Project.objects.get_or_create(name='Unassigned')
        else:
            project = Project.objects.get(id=project_data['id'])
            project = Project.objects.create(**project_data)
        daily_wc = DailyWc.objects.create(project=project, **validated_data)
        return daily_wc
