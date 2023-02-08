#  def update(self, instance, validated_data):
#         print(validated_data)
#         project_data = validated_data.pop('project', {})
#         project = instance.project

#         if project_data:
#             project_serializer = ProjectSerializer(instance.project, data=project_data)
#             if project_serializer.is_valid():
#                 project = project_serializer.save()
#         # Still need to figure out how to drag the project data into here.x
#         instance.project = project
#         # instance.project = validated_data.get('project', instance.project)
#         instance.todays_wc = validated_data.get('todays_wc', instance.todays_wc)
#         instance.user = validated_data.get('user', instance.user)
#         instance.daily_goal = validated_data.get('daily_goal', instance.daily_goal)
#         instance.date = validated_data.get('date', instance.date)
#         instance.accessed_today = validated_data.get('accessed_today', instance.accessed_today)
#         instance.id = validated_data.get('id', instance.id)
#         # REQUIRES MORE WORK: ()
#         # instance.project = validated_data.get('project', instance.project)
#         instance.text_area = validated_data.get('text_area', instance.text_area)
#         instance.save()
#         return instance

#     def create(self, validated_data):
#         # have a project object on it. Get project off using id
#         project_data = validated_data.pop('project', None)
#         print(validated_data)
#         if project_data is None:
#             project, created = Project.objects.get_or_create(name='name')
#         else:
#             project = Project.objects.get(id=project_data['id'])
#             project = Project.objects.create(**project_data)
#         daily_wc = DailyWc.objects.create(project=project, **validated_data)
#         return daily_wc


#     def create(self, validated_data):
#         print(validated_data)
#         project_data = validated_data.pop('project', None)
#         project, created = Project.objects.get_or_create(
#             name=project_data['name']
#         )
#         daily_wc = DailyWc.objects.create(project=project, **validated_data)
#         return daily_wc




    # # get_or_create method to try to retrieve an existing Project with the same name, specified in project_data
    # project, created = Project.objects.get_or_create(
    #     # If the Project exists, it updates it and returns it.
    #     # If the Project does not exist, it creates a new one with the same name.
    #     name=project_name,
    #     defaults={
    #         'name': project_name,
    #     }
    # )