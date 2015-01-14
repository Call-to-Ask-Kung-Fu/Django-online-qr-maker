from django.core.paginator import Page
class JsonPage(Paginator):
    def __getitem__(self, index):
        if not isinstance(index, (slice,) + six.integer_types):
            raise TypeError
        # The object_list is converted to a list so that if it was a QuerySet
        # it won't be a database hit per __getitem__.
        if not isinstance(self.object_list, list):
            self.object_list = list(self.object_list)
        qs = self.object_list[index]
        c = {}
        c = str({'%s':'{"words":"%s", "avatar":"%s", "name":"%s", "url":"%s", "qr":"%s"}'} % (index, words, avatar, name, url, qr))
        return c

