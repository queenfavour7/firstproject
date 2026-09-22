from django.db import models

# Create your models here.

class catergory(models.Model):
    name = models.CharField(max_length=30)
    slug = models.CharField(max_length=20)

    def __str__(self):
        return self.name
    
class Post(models.Model):
    catergory = models.ForeignKey(catergory,on_delete= models.CASCADE)
    title = models.CharField(max_length=40)
    sub_title = models.CharField(max_length=20)
    content = models.TextField(max_length=300)
    image = models.ImageField(upload_to="post/",null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=False)
    is_public = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    