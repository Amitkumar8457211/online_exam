from time import strftime, gmtime

from knox.auth import TokenAuthentication
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from online_exam.models import QuestionTable, ExamTable, AnswerTable, ResultTable
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView

from django.db import connection


# Create your views here.


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)


class exam(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, branchCode):
        showtime = strftime("%Y-%m-%d %H:%M:%S", gmtime())
        model = ExamTable.objects.filter(branchCode=branchCode).filter(startExam__lte=showtime).filter(endExam__gte=showtime)
        #model = ExamTable.objects.filter(branchCode=branchCode)
        serializer = ExamSerializer(model, many=True)
        return Response(serializer.data)


class question(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, username, id):
        result = AnswerTable.objects.filter(examid=id).filter(username=username)
        result1 = ResultTable.objects.filter(examid=id).filter(username=username)
        if result.count() or result1.count() :
            return Response({"message": "You allready attempt this exam"})

        model = QuestionTable.objects.filter(examId=id)
        if model.count() == 0:
            return Response({"message": "No Question available for this exam yet"})

        serializer = QuestionSerializer(model, many=True)
        return Response(serializer.data)


class SubmitAnswer(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        username = request.data.get("username")
        examid = request.data.get("examid")
        questionid = request.data.get("questionid")

        data = {
            "username": request.data.get("username"),
            "examid": request.data.get("examid"),
            "questionid": request.data.get("questionid"),
            "answer": request.data.get("answer")
        }

        object = AnswerTable.objects.filter(examid=examid).filter(username=username).filter(
            questionid=questionid).first()

        if object:
            serializer = AnswerSerializer(object, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    "message": "update successfully"
                })

        serializer = AnswerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return Response({
            "message": "Save successfully"
        })


class SubmitExam(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        username = request.data.get("username")
        examid = request.data.get("examid")

        allreadysubmit = ResultTable.objects.filter(username=username, examid=examid).count()

        if allreadysubmit:
            return Response({"message": "You allready submit this exam"})

        totalmark = QuestionTable.objects.filter(examId_id=examid).count()
        totalquestion = QuestionTable.objects.filter(examId_id=examid).count()
        questionattempt = AnswerTable.objects.filter(examid=examid).filter(username=username).count()
        # getmark = AnswerTable.objects.filter(examid=examid,username=username).filter(answer__in = [QuestionTable.objects.filter(examId_id=examid).correctAns.all()]).count()
        with connection.cursor() as cursor:
            query = """
                   SELECT count(*) FROM online_exam_questiontable q , online_exam_answertable  a 
                   WHERE a.username=username AND a.examid=examid AND q.examId_id = examid AND a.answer = q.correctAns and a.questionid = q.id ;
                   """
            cursor.execute(query)
            row = cursor.fetchone()

        getmark = int(row[0])
        percentage = int((getmark * 100) / totalmark)
        reason = request.data.get("reason")

        data = {
            "username": username,
            "examid": examid,
            "totalmark": totalmark,
            "getmark": getmark,
            "totalquestion": totalquestion,
            "questionattempt": questionattempt,
            "percentage": percentage,
            "reason": reason
        }

        serializer = ResultSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Exam submitted successfully"
            })

        print(data)
        return Response({
            "message": "Getting error Try again"
        })
