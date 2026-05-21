package com.esiea.artapp.dto;

public class ArtResponse<T> {

    private boolean success;
    private String message;
    private T data;

    public ArtResponse() {}

    public ArtResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public static <T> ArtResponse<T> ok(T data) {
        return new ArtResponse<>(true, "Succès", data);
    }

    public static <T> ArtResponse<T> ok(T data, String message) {
        return new ArtResponse<>(true, message, data);
    }

    public static <T> ArtResponse<T> created(T data, String message) {
        return new ArtResponse<>(true, message, data);
    }

    public static <T> ArtResponse<T> error(String message) {
        return new ArtResponse<>(false, message, null);
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public T getData() { return data; }
    public void setData(T data) { this.data = data; }
}
