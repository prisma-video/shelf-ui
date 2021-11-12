import sys
import json
import subprocess

with open('./script/data.json') as f:
    data = json.load(f)

with open('./script/fake_profiles.json') as f:
    fake_profiles = json.load(f)

network = ''
if sys.argv[1] == 'ic':
    print('IC network')
    network = '--network ic'

MINTER = "mcnes-wkvkd-habbb-sctde-hwuhr-adhwb-y24aj-p2ppe-2bgva-sfvb2-5ae"

# mint movies
for n, row in enumerate(data):
    # if n > 0: break
    title=row.get('title')
    original_owner=row.get('original_owner')
    internal_id=row.get('internal_id')
    shipment_id=row.get('shipment_id')
    previous_metadata=row.get('previous_metadata')
    metadata_version=row.get('metadata_version')
    # print(row)

    metadata = f' record {{name="NFT of {title}"; description= "DVD of {title}"; properties= record {{title="{title}"; original_owner=principal "{original_owner}";internal_id="{internal_id}";shipment_id="{shipment_id}";previous_metadata="{previous_metadata}";metadata_version={metadata_version}}}}}'

    command="dfx canister {} call nft mintMovieNFT '(principal \"{}\", {}, {})'".format(network, MINTER, metadata, "In-the-Park-v2")
    # print(command)
    ret = subprocess.run(command, capture_output=True, shell=True)

    print(ret.stdout.decode())
    print(ret.stderr.decode())

    if n % 3 == 0:
        print(f"transfer token {n}")
        command=f"dfx canister {network} call nft transferFrom '(principal \"mcnes-wkvkd-habbb-sctde-hwuhr-adhwb-y24aj-p2ppe-2bgva-sfvb2-5ae\", principal \"2vxsx-fae\", {n})'"
        print(command)
        ret = subprocess.run(command, capture_output=True, shell=True)
        print(ret.stdout.decode())
        print(ret.stderr.decode())


# create users
for n, row in enumerate(fake_profiles):
    # if n > 0: break
    title=row.get('title')
    original_owner=row.get('original_owner')
    internal_id=row.get('internal_id')
    shipment_id=row.get('shipment_id')
    previous_metadata=row.get('previous_metadata')
    metadata_version=row.get('metadata_version')
    # print(row)

    metadata = f' record {{name="NFT of {title}"; description= "DVD of {title}"; properties= record {{title="{title}"; original_owner=principal "{original_owner}";internal_id="{internal_id}";shipment_id="{shipment_id}";previous_metadata="{previous_metadata}";metadata_version={metadata_version}}}}}'

    command="dfx canister {} call nft mintMovieNFT '(principal \"{}\", {}, {})'".format(network, MINTER, metadata, "In-the-Park-v2")
    # print(command)
    ret = subprocess.run(command, capture_output=True, shell=True)

    print(ret.stdout.decode())
    print(ret.stderr.decode())

    if n % 3 == 0:
        print(f"transfer token {n}")
        command=f"dfx canister {network} call nft transferFrom '(principal \"mcnes-wkvkd-habbb-sctde-hwuhr-adhwb-y24aj-p2ppe-2bgva-sfvb2-5ae\", principal \"2vxsx-fae\", {n})'"
        print(command)
        ret = subprocess.run(command, capture_output=True, shell=True)
        print(ret.stdout.decode())
        print(ret.stderr.decode())


