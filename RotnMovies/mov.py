import pandas as pd # type: ignore

# Load the CSV file into a DataFrame
df = pd.read_csv('IMDB Dataset.csv')

# Select relevant columns and rename them if necessary
df = df[['title', 'genre', 'rating', 'reviews']]

# Convert the DataFrame to JSON
df.to_json('movies.json', orient='records')
