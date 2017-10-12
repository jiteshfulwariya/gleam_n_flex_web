import datetime



def convert_date_to_epoch(date):
    return long(date.strftime('%s'))*1000 if date else None

def convert_epoch_to_date(epoch):
    return datetime.datetime.fromtimestamp(long(epoch)/1000.0) if epoch else None
