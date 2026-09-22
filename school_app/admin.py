from django.contrib import admin

from  .models import Post,catergory
# Register your models here.
@admin.register(Post)
     
class PostAdmin(admin.ModelAdmin):
    search_field =["title","created_at"]
    list_display = ["title","created_at","sub_title"]

@admin.register(catergory)

class catergoryAdmin(admin.ModelAdmin):
    search_fields = ["name","slug"]
    list_display = ["name","slug"]
