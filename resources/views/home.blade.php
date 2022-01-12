@extends('layouts.app')

@section('content')
    @push('css')
        <link href="{{ url('css/style.css') }}" rel="stylesheet">
    @endpush

    @push('js')

        </script>
        <script src="{{ url('js/socket.io.min.js') }}"></script>

        <script src="{{ url('js/jquery-1.10.1.min.js') }}"></script>
        <script type="text/javascript">
            var user_id = '{{ auth()->user()->id }}';
            var username = '{{ auth()->user()->name }}';
        </script>
        <script src="{{ url('js/script.js') }}"></script>
    @endpush

    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Chat Control</div>

                <div class="card-body">
                    <p>
                        <label>Online: <input type="radio" name="status" class="status" checked value="online">
                        </label>
                    </p>
                    <p>
                        <label>Offline: <input type="radio" name="status" class="status" value="offline"></label>
                    </p>
                    <p>
                        <label>Bys: <input type="radio" name="status" class="status" value="bys"></label>
                    </p>
                    <p>
                        <label>Dnd: <input type="radio" name="status" class="status" value="dnd"></label>
                    </p>
                    <div id="chat-sidebar">
                        @foreach (App\Models\User::where('id', '!=', auth()->user()->id)->get() as $user)
                            <div id="sidebar-user-box" class="user" uid="{{ $user->id }}">
                                <img src="{{ url('image/user.png') }}" />
                                <span id="slider-username">{{ $user->name }}</span>
                                <span class="user_status user_{{ $user->id }}">&nbsp;</span>
                            </div>
                        @endforeach

                    </div>

                </div>
            </div>
        </div>
    </div>

@endsection
