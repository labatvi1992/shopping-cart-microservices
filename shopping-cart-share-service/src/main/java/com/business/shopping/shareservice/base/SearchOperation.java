package com.business.shopping.shareservice.base;

public enum SearchOperation {
    LIKE {
        public String toString() {
            return "LIKE";
        }
    },
    EQUALITY {
        public String toString() {
            return "EQ";
        }
    },
    GREATER_THAN {
        public String toString() {
            return "GT";
        }
    },
    LESS_THAN {
        public String toString() {
            return "LT";
        }
    },
    STARTS_WITH {
        public String toString() {
            return "SW";
        }
    },
}
