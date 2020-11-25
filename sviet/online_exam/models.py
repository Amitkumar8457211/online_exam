# from django.db import models
from django.contrib.auth.models import models
from django.core.validators import MaxValueValidator, MinValueValidator


class ExamTable(models.Model):
    objects = None
    id = models.AutoField(primary_key=True)
    examName = models.CharField(max_length=200, blank=False)
    branchCode = models.CharField(max_length=10, blank=False)
    subjectCode = models.CharField(max_length=10, blank=False)
    time = models.IntegerField(default='0', blank=False)
    startExam = models.DateTimeField(blank=False)
    endExam = models.DateTimeField(blank=False)

    def __str__(self):
        return self.examName


class QuestionTable(models.Model):
    objects = None
    id = models.AutoField(primary_key=True)
    examId = models.ForeignKey(ExamTable, on_delete=models.CASCADE)
    question = models.TextField(max_length=500, blank=False)
    option1 = models.TextField(max_length=200, blank=False)
    option2 = models.TextField(max_length=200, blank=False)
    option3 = models.TextField(max_length=200, blank=False)
    option4 = models.TextField(max_length=200, blank=False)
    correctAns = models.IntegerField(default='0', validators=[MaxValueValidator(4), MinValueValidator(1)])

    def __str__(self):
        return self.question


class AnswerTable(models.Model):
    objects = None
    id = models.AutoField(primary_key=True)
    username = models.TextField(max_length=20, blank=False)
    examid = models.IntegerField(blank=False)
    questionid = models.IntegerField(blank=False)
    answer = models.IntegerField(default="0", blank=False)
    currenttime = models.DateTimeField(auto_now_add=True, blank=False)


class ResultTable(models.Model):
    objects = None
    id = models.AutoField(primary_key=True)
    username = models.TextField(max_length=20, blank=False)
    examid = models.IntegerField(blank=False)
    totalmark = models.IntegerField(blank=False)
    getmark = models.IntegerField(blank=False)
    totalquestion = models.IntegerField(blank=False)
    questionattempt = models.IntegerField(blank=False)
    percentage = models.IntegerField(blank=False)
    currenttime = models.DateTimeField(auto_now_add=True, blank=False)

    def __str__(self):
        return self.username

    