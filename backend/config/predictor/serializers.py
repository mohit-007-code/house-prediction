from rest_framework import serializers

class HousePriceSerializer(serializers.Serializer):
    area = serializers.IntegerField()
    bedrooms = serializers.IntegerField()
    bathrooms = serializers.IntegerField()
    stories = serializers.IntegerField()
    mainroad = serializers.CharField()
    guestroom = serializers.CharField()
    basement = serializers.CharField()
    hotwaterheating = serializers.CharField()
    airconditioning = serializers.CharField()
    parking = serializers.IntegerField()
    prefarea = serializers.CharField()
    furnishingstatus = serializers.CharField()
