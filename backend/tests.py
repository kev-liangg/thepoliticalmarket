# all tests must begin with "test"

def pow2 (p) :
    return lambda v : v ** p

def test5 () :
    a = [2, 3, 4]
    m = map(pow2(2), a)
    assert list(m) == [4, 9, 16]
    assert list(m) == []

def test7 () :
    a     = [2, 3, 4]
    n     = [1]
    m     = map(lambda v : v ** next(iter(n)), a) # O(1)
    a    += [5]
    n[0]  = 2
    assert list(m) == [4, 9, 16, 25]
    assert list(m) == []