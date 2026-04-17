import joblib
import numpy as np
import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response

model = joblib.load("save_model/house_price_model.pkl")

@api_view(["POST"])
def predict_price(request):
    data = request.data


    input_data = {
        "area": data["area"],
        "bedrooms": data["bedrooms"],
        "bathrooms": data["bathrooms"],
        "stories": data["stories"],
        "mainroad": 1 if data["mainroad"] == "yes" else 0,
        "guestroom": 1 if data["guestroom"] == "yes" else 0,
        "basement": 1 if data["basement"] == "yes" else 0,
        "hotwaterheating": 1 if data["hotwaterheating"] == "yes" else 0,
        "airconditioning": 1 if data["airconditioning"] == "yes" else 0,
        "parking": data["parking"],
        "prefarea": 1 if data["prefarea"] == "yes" else 0,
        "furnishingstatus": {
            "unfurnished": 0,
            "semi-furnished": 1,
            "furnished": 2,
        }[data["furnishingstatus"]],
    }

    df = pd.DataFrame([input_data])


    df["total_rooms"] = df["bedrooms"] + df["bathrooms"]
    df["area_per_room"] = df["area"] / (df["total_rooms"] + 1)
    df["bath_per_bed"] = df["bathrooms"] / (df["bedrooms"] + 1)

    log_prediction = model.predict(df)[0]

    final_price = np.expm1(log_prediction)

    return Response({
        "predicted_price": round(float(final_price), 2)
    })
