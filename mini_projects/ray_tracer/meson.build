project('Ray Tracing', 'cpp', default_options: ['cpp_std=c++11'])

command = run_command('get_src_files.sh')
source_files = command.stdout().strip().split('\n')

out = executable('ray_tracing', source_files)

