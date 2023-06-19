from django.db import models

# Create your models here.
class Dashboard(models.Model):
    end_year = models.IntegerField(blank=True, null = True)
    intensity = models.IntegerField(null=True)
    sector = models.CharField(max_length=20)
    topic = models.CharField(max_length=20)
    insights = models.CharField(max_length=50)
    url = models.URLField(null=True)
    region = models.CharField(max_length=20)
    start_year = models.IntegerField(blank=True, null = True)
    added = models.CharField(max_length=50)
    published = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    relavence = models.IntegerField(blank=True, null = True)
    postle = models.CharField(max_length=20)
    source = models.CharField(max_length=20)
    title = models.TextField(null=True)
    likelihood = models.IntegerField(null=True)
"""
{
    "end_year": "",
    "intensity": 6,
    "sector": "Energy",
    "topic": "gas",
    "insight": "Annual Energy Outlook",
    "url": "http://www.eia.gov/outlooks/aeo/pdf/0383(2017).pdf",
    "region": "Northern America",
    "start_year": "",
    "impact": "",
    "added": "January, 20 2017 03:51:25",
    "published": "January, 09 2017 00:00:00",
    "country": "United States of America",
    "relevance": 2,
    "pestle": "Industries",
    "source": "EIA",
    "title": "U.S. natural gas consumption is expected to increase during much of the projection period.",
    "likelihood": 3
},
"""