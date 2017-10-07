



def convert_date_to_epoch(date):
    return long(date.strftime('%s'))*1000 if date else None
