from django.contrib import admin
from online_exam.models import ExamTable,QuestionTable,ResultTable

# Register your models here.
admin.site.register(ExamTable)
admin.site.register(QuestionTable)
admin.site.register(ResultTable)

