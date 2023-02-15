from rest_framework import serializers
from django.contrib.auth.models import User
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
            'user' # Default is userId
        )


class DailyWcSerializer(serializers.ModelSerializer):

    class Meta:
        model = DailyWc
        fields = '__all__'


    # For the nested serializer to be writable, you'll need to create create() and/or update() methods
    # to explicitly specify how the child relationships should be saved.
    def create(self, validated_data):
        project_data = validated_data.pop('project')
        user = validated_data.pop('user')
        userid = User.objects.get(username=user)
        
        project = Project.objects.filter(name='Unassigned').filter(user=userid.id)

        if len(project) == 0:
            print(project_data)
            print('words' * 100)
            project = Project.objects.create(**project_data)

        print(validated_data)
        dailywc = DailyWc.objects.create(project=project[0], **validated_data, user=userid)
        print(f'The custom create is working. {dailywc} is the daily wordcount. Project data: {project_data}. Project: {project[0]}')
        return dailywc
