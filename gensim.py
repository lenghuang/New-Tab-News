# Code Taken From
# https://towardsdatascience.com/easily-scrape-and-summarize-news-articles-using-python-dfc7667d9e74

from gensim.summarization.summarizer import summarize


def read_article(file_name):
    file = open(file_name, "r")
    filedata = file.readlines()
    article = filedata[0].split(". ")
    sentences = []

    for sentence in article:
        sentences.append(sentence.replace("[^a-zA-Z]", " "))
    return ". ".join(sentences)


def get_ratio(n):
    ratio = 0.001 if n == 0 else 200 / n
    return ratio


text = read_article('npr.txt')
summary = summarize(text, get_ratio(len(text)))
