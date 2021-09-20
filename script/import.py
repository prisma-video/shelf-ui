import sys
import json
import subprocess

with open('./script/data.json') as f:
    data = json.load(f)

network = ''
if sys.argv[1] == 'ic':
    print('IC network')
    network = '--network ic'

MINTER = "mcnes-wkvkd-habbb-sctde-hwuhr-adhwb-y24aj-p2ppe-2bgva-sfvb2-5ae"

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

    command="dfx canister {} call nft mintMovieNFT '(principal \"{}\", {})'".format(network, MINTER, metadata)
    # print(command)
    ret = subprocess.run(command, capture_output=True, shell=True)

    print(ret.stdout.decode())
    print(ret.stderr.decode())

    if n % 3 == 0:
        command=f"dfx canister {network} call nft transferFrom '(principal \"mcnes-wkvkd-habbb-sctde-hwuhr-adhwb-y24aj-p2ppe-2bgva-sfvb2-5ae\", principal \"cfoi7-gxiji-l2v2o-wb3lo-dl4uy-cupdb-lybmy-elhx5-urscz-2oddr-jae\", {n})'"
        ret = subprocess.run(command, capture_output=True, shell=True)
        print(ret.stdout.decode())
        print(ret.stderr.decode())
