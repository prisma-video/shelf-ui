import sys
import json
import subprocess
from ast import literal_eval as make_tuple

with open('./script/mockup.json') as f:
    movie_data = json.load(f)

network = ''
if sys.argv[1] == 'ic':
    print('IC network')
    network = '--network ic'

# TRUCATE_DATA=True
TRUCATE_DATA=False
IMPORT_TAGS=True
# IMPORT_TAGS=False
IMPORT_PEOPLE=True
# IMPORT_PEOPLE=False
IMPORT_MOVIES=True
# IMPORT_MOVIES=False

MINTER = "mcnes-wkvkd-habbb-sctde-hwuhr-adhwb-y24aj-p2ppe-2bgva-sfvb2-5ae"

def process_query(command):
    print(command)
    ret = subprocess.run(command, capture_output=True, shell=True)
    print(ret.stdout.decode())
    print(ret.stderr.decode())

def truncate_table(table):
    command=f"dfx canister {network} call metadata_db graphql_query '(\"query {{ read{table} {{id}}}}\": text, \"{{}}\": text)'"
    res = subprocess.run(command, capture_output=True, shell=True)
    result = json.loads(res.stdout.decode()[1:-1].strip()[1:-4])
    for n, id in enumerate(result['data']['read'+table]):
        command=f"dfx canister {network} call metadata_db graphql_query '(\"mutation {{ delete{table}(input: {{ id: \\\"{id['id']}\\\" }}) {{id}}}}\": text, \"{{}}\": text)'"
        process_query(command)

if TRUCATE_DATA:
    for table in ['Tag']:
    # for table in ['Movie', 'Tag', 'People']:
        try:
            truncate_table(table)
        except Exception as e:
            print(str(e))
            break

TAGS = set([item for sublist in movie_data for item in sublist['tags']])
tags =[]
if IMPORT_TAGS:
    print("Importing tags")
    for n, row in enumerate(TAGS):

        command=f"dfx canister {network} call metadata_db graphql_mutation '(\"mutation {{ createTag(input: {{name: \\\"{row}\\\"}}) {{id, name}}}}\": text, \"{{}}\": text)'"
        
        process_query(command)

people = [f['directors']+f['cast']  for f in movie_data]
people = set([item for sublist in people for item in sublist])
if IMPORT_PEOPLE:
    print("Importing tags")
    for n, row in enumerate(people):

        command=f"dfx canister {network} call metadata_db graphql_mutation '(\"mutation {{ createPeople(input: {{name: \\\"{row}\\\"}}) {{id, name}}}}\": text, \"{{}}\": text)'"
        process_query(command)


def extract_ids_from_array(lookup_vals, db_id):
    result = []
    for tag in lookup_vals:
        for t in db_id:
            if t['name'] == tag:
                result.append(t['id'])
    return result

if IMPORT_MOVIES:
    print("Importing movies")
    command=f"dfx canister {network} call metadata_db graphql_query '(\"query {{ readPeople {{id, name}}}}\": text, \"{{}}\": text)'"
    ret = subprocess.run(command, capture_output=True, shell=True)
    people = json.loads(ret.stdout.decode()[1:-1].strip()[1:-4])

    command=f"dfx canister {network} call metadata_db graphql_query '(\"query {{ readTag {{id, name}}}}\": text, \"{{}}\": text)'"
    ret = subprocess.run(command, capture_output=True, shell=True)
    tags = json.loads(ret.stdout.decode()[1:-1].strip()[1:-4])

    for n, row in enumerate(movie_data):

        tagging = extract_ids_from_array(row['tags'], tags['data']['readTag'])
        cast = extract_ids_from_array(row['cast'], people['data']['readPeople'])
        directors = extract_ids_from_array(row['directors'], people['data']['readPeople'])
        
        query = """mutation {
                createMovie(input: {
                    legacy_id: """+str(row["id"])+""",
                    original_language: '"""+str(row["original_language"])+"""',
                    original_title: '"""+str(row["original_title"])+"""',
                    overview: '"""+str(row["overview"])+"""',
                    popularity: """+str(row["popularity"])+""",
                    release_date: '"""+str(row["release_date"])+"""',
                    title: '"""+str(row["title"])+"""',
                    vote_average: """+str(row["vote_average"])+""",
                    vote_count: """+str(row["vote_count"])+""",
                    tags: {connect: """+json.dumps(tagging)+"""}
                    cast: {connect: """+json.dumps(cast)+"""}
                    directors: {connect: """+json.dumps(directors)+"""}
                }) {
                    id,
                    title
                }
            }""".replace("\n", "")

        input = query.replace("'", "\"").replace("\"", "\\\"")

        command=f"dfx canister {network} call metadata_db graphql_mutation '(\"{' '.join(input.split())}\": text, \"{{}}\": text)'"
        
        process_query(command)
