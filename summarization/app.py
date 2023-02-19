import streamlit as st
from inference import generate_model

st.set_page_config(layout="wide")
if __name__ == '__main__':
    st.write('summarization')
    st.text_input('In put your Text')