package com.example.nuptial.chapter2interprocommunication;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by nuptial on 2018/4/3.
 */

public class Book implements Parcelable {
    public int bookId;
    public String bookName;
    public Book(int bookId,String bookName){
        this.bookId= bookId;
        this.bookName = bookName;
    }
    public int describeContents(){
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i) {
        parcel.writeInt(bookId);
        parcel.writeString(bookName);
    }

    public static final Parcelable.Creator<Book> CREATOR = new Parcelable.Creator<Book>(){
        public Book createFromParcel(Parcel in){
            return new Book(in);
        }
        public Book[] newArray(int size){
            return new Book[size];
        }

    };
    private Book(Parcel in){
        bookId = in.readInt();
        bookName = in.readString();
    }

}
