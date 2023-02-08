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

    class Meta:
        model = DailyWc
        fields = '__all__'


    # For the nested serializer to be writable, you'll need to create create() and/or update() methods
    # to explicitly specify how the child relationships should be saved.
    def create(self, validated_data):
        project_data = validated_data.pop('project')

        try:
            # checking if a project named "Unassigned" exists
            #  if it does, using that project instance as the foreign key for the new DailyWc instance
            project = Project.objects.get(name='Unassigned')
        except Project.DoesNotExist:
            project = Project.objects.create(**project_data)
        dailywc = DailyWc.objects.create(project=project, **validated_data)
        print(f'The custom create is working. {dailywc} is the daily wordcount. Project data: {project_data}. Project: {project}')
        return dailywc
