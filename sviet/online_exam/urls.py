from django.conf.urls import url
from online_exam import views
from online_exam.views import LoginAPI
from knox import views as knox_views

urlpatterns = [

    url('^api/question/(?P<username>[\w@%.]+)/(?P<id>[0-9]+)/$', views.question.as_view()),
    url(r'^api/exam/(?P<branchCode>[\w@%.]+)/$', views.exam.as_view()),
    url('^api/login/', LoginAPI.as_view(), name='login'),
    url('^api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    url('^api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    url(r'^api/submitanswer/', views.SubmitAnswer.as_view()),
    url(r'^api/submitexam/', views.SubmitExam.as_view()),
    # url('api/register/', RegisterAPI.as_view(), name='register'),
    #url(r'^api/question/(?P<examcode>[\w@%.]+)/$', views.question.as_view(), name='question'),
    # url('^api/question/(?P<examid>[0-9]+)/$', views.question.as_view()),
    #path('', include('online_exam.urls')),
]

