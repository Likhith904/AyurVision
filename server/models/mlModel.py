# mlModel.py

import joblib
import numpy as np


class MLModel:
    def __init__(self, model_path):
        self.model = joblib.load(model_path)

    def preprocess_input(self, input_data):
        # Perform any necessary pre-processing
        # Convert input to numpy array if needed
        input_data = np.array(input_data)
        return input_data

    def predict(self, input_data):
        input_data = self.preprocess_input(input_data)
        predictions = self.model.predict(input_data)
        return predictions
