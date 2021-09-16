import json
import subprocess

with open('./script/data.json') as f:
    data = json.load(f)

MINTER = "mcnes-wkvkd-habbb-sctde-hwuhr-adhwb-y24aj-p2ppe-2bgva-sfvb2-5ae"

for row in data:

    command="dfx canister call nft mintNFT '(principal \"{}\", \"{}\")'".format(MINTER, json.dumps(data[0]).replace('"', '\\"'))

    ret = subprocess.run(command, capture_output=True, shell=True)

    # before Python 3.7:
    # ret = subprocess.run(command, stdout=subprocess.PIPE, shell=True)

    print(ret.stdout.decode())