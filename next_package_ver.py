import datetime
import semantic_version
import sys

if len(sys.argv) != 3:
    print("Usage: " + sys.argv[0] + " kiota_v local_v")
    sys.exit(1)

kiota_v = semantic_version.Version(sys.argv[1])
local_v = semantic_version.Version(sys.argv[2])
if kiota_v.major < local_v.major or kiota_v.minor < local_v.minor:
    print(str(kiota_v.next_patch())+'.fallback'+datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%d'))
elif kiota_v.major==local_v.major and kiota_v.minor==local_v.minor:
    print(local_v.next_patch())
else: 
    print(kiota_v)
