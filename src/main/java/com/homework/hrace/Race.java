package com.homework.hrace;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "race")
public class Race {
    @Id
    @GeneratedValue
    private Long id;

    private String place;
    private String time;

    @ElementCollection
    private List<Long> horses = new ArrayList<Long>();

    private Long betId;
    private Long winner;

    public Long getWinner() {
        return winner;
    }

    public void setWinner(Long winner) {
        this.winner = winner;
    }

    public Long getBetId() {
        return betId;
    }

    public void setBetId(Long betId) {
        this.betId = betId;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public List<Long> getHorses() {
        return horses;
    }

    public void setHorses(List<Long> horses) {
        this.horses = horses;
    }

    public Race() {}

    public Race(String place, String time) {
        this.place = place;
        this.time = time;
    }
}
