from django_filters import FilterSet, CharFilter


class ChatFilter(FilterSet):
    username = CharFilter(field_name='username')
