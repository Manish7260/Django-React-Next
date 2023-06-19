from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from import_export import resources
from .models import Dashboard

# Register your models here.
class DashboardResource(resources.ModelResource):
    class Meta:
        model = Dashboard

class DashboardAdmin(ImportExportModelAdmin):
    resource_class = DashboardResource

admin.site.register(Dashboard, DashboardAdmin)
