import streamlit as st
from gtts import gTTS
import os

# Streamlit app title
st.title("Text to Speech Converter")

# Text input from user
text = st.text_area("Enter the text you want to convert to speech:")

# Language selection
language = st.selectbox("Select Language", ["en", "es", "fr", "de", "zh-cn","ja"])

# Convert text to speech
if st.button("Convert to Speech"):
    if text:
        tts = gTTS(text=text, lang=language, slow=False)
        tts.save("output.mp3")
        st.audio("output.mp3", format="audio/mp3")
        
        # Provide a download link for the audio file
        with open("output.mp3", "rb") as file:
            st.download_button(
                label="Download Speech",
                data=file,
                file_name="output.mp3",
                mime="audio/mp3"
            )
    else:
        st.warning("Please enter some text to convert.")