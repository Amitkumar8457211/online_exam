from rest_framework import serializers
from online_exam.models import QuestionTable, ExamTable, AnswerTable,ResultTable
from django.contrib.auth.models import User


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamTable
        fields = ('id', 'examName', 'branchCode' ,'subjectCode' , 'time')


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionTable
        fields = ('id', 'question', 'option1' ,'option2' , 'option3' , 'option4' , 'examId')


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerTable
        fields = ( 'username', 'examid', 'questionid', 'answer')


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultTable
        #fields = '__all__'
        fields = ( 'username', 'examid', 'totalmark', 'getmark', 'totalquestion', 'questionattempt', 'percentage')

