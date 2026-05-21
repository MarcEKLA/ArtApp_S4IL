package com.esiea.artapp.dto;

import org.springframework.data.domain.Page;
import java.util.List;

public class PageDTO<T> {

    private List<T> content;       
    private int page;              
    private int size;              
    private long totalElements;    
    private int totalPages;        
    private boolean first;         
    private boolean last;          

    public PageDTO() {}

    public static <T> PageDTO<T> from(Page<T> page) {
        PageDTO<T> dto = new PageDTO<>();
        dto.setContent(page.getContent());
        dto.setPage(page.getNumber());
        dto.setSize(page.getSize());
        dto.setTotalElements(page.getTotalElements());
        dto.setTotalPages(page.getTotalPages());
        dto.setFirst(page.isFirst());
        dto.setLast(page.isLast());
        return dto;
    }

    public List<T> getContent() { return content; }
    public void setContent(List<T> content) { this.content = content; }

    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }

    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }

    public long getTotalElements() { return totalElements; }
    public void setTotalElements(long totalElements) { this.totalElements = totalElements; }

    public int getTotalPages() { return totalPages; }
    public void setTotalPages(int totalPages) { this.totalPages = totalPages; }

    public boolean isFirst() { return first; }
    public void setFirst(boolean first) { this.first = first; }

    public boolean isLast() { return last; }
    public void setLast(boolean last) { this.last = last; }
}
