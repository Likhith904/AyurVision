<<<<<<< HEAD
# llama-index
=======
# RAG-chat-with-documents
Chainlit app for advanced RAG. Uses llamaparse, langchain, qdrant and models from groq.



### Links 
- [LlamaCloud](https://cloud.llamaindex.ai/)
- [Qdrant Cloud](https://cloud.qdrant.io/)
- [Groq Cloud](https://console.groq.com/)

### create virtualenv
```
python3 -m venv .venv && source .venv/bin/activate
```

### Install packages
```
pip install -r requirements.txt
```

### Environment variables
All env variables goes to .env ( cp `.env.sample` to `.env` and paste required env variables)

### Run the python files (following the video to run step by step is recommended)
```
python3 ingest.py
chainlit run app.py
```

## Additional helper documents
- [LlamaIndex blogpost about Llamaparse](https://www.llamaindex.ai/blog/launching-the-first-genai-native-document-parsing-platform)
- [Parsing instructions Llamaparse](https://colab.research.google.com/drive/1dO2cwDCXjj9pS9yQDZ2vjg-0b5sRXQYo#scrollTo=dEX7Mv9V0UvM)

>>>>>>> 5672a8f (made some changes)
